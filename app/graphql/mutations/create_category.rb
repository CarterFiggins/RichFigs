class Mutations::CreateCategory < Mutations::BaseMutation
  null true
  description "Make Category"
  field :category, Types::CategoriesType, null: false
  argument :name, String, required: true
  argument :amount, Float, required: true
  argument :is_fixed, Boolean, required: false
  argument :month_id, ID, required: true
  argument :repeated, Boolean, required: false
  argument :category_id, ID, required: false
  argument :date, Int, required: false

  def resolve(name:, amount:, is_fixed:, month_id:, repeated:, category_id:, date:)

    planned = 0
    expense = 0
    repeat_id = nil
    month = Month.find(month_id)
    year = Year.find(month.year_id)
    payload = {}
    month_year = Year.find(month.year_id)

    current_date = Time.new(year.year_date, month.month_num, date)

    

    if repeated
      can_repeat = true
      if category_id
        can_repeat = Category.find(category_id).repeat_id ? false : true
      end
      if can_repeat
        repeat = Repeat.create(
          account_id: month_year.account_id,
          name: name,
          amount: amount,
          year_date: month_year.year_date,
          month_date: month.month_num, 
          day_date: current_date,
          transaction_type: is_fixed ? "expense" : "planned",
          alive: true,
        )
        repeat_id = repeat.id
      end
    end


    if category_id
      oldCategory = Category.find(category_id)
      planned = oldCategory.planned
      expense = oldCategory.expense
      if is_fixed && oldCategory.is_fixed
        month.update(expense: amount + month.expense - oldCategory.expense, planned: amount + month.planned - oldCategory.planned)
        expense = amount
      elsif !is_fixed && oldCategory.is_fixed
        month.update(expense: month.expense - oldCategory.expense, planned: amount + month.planned - oldCategory.planned)
        planned = amount
        expense = 0
      elsif is_fixed && !oldCategory.is_fixed
        month.update(expense: amount + month.expense - oldCategory.expense, planned: amount + month.planned - oldCategory.planned)
        expense = amount
        planned = amount
      else 
        month.update(planned: amount + month.planned - oldCategory.planned)
        planned = amount
      end
      oldCategory.update(name: name, planned: planned, expense: expense, is_fixed: is_fixed, month_id: month_id, date: current_date )
      payload = { category: oldCategory }
    else

      if is_fixed
        month.update(expense: amount + month.expense, planned: amount + month.planned)
        expense = amount;
        planned = amount;
      else
        month.update(planned: amount + month.planned)
        planned = amount;
      end
      
      category = Category.create(
        name: name,
        planned: planned,
        expense: expense,
        is_fixed: is_fixed,
        month_id: month_id,
        date: current_date,
        repeat_id: repeat_id
      )

      payload = { category: category }
    end
    if repeat_id && repeated
      months = Month.where(year_id: month_year.id)
      months.where("month_num > ?", month.month_num).each do |m|
        m.update(expense: expense + m.expense, planned: planned + m.planned)
        Category.create(
          name: name, 
          planned: planned, 
          expense: expense, 
          is_fixed: is_fixed, 
          month_id: m.id,
          repeat_id: repeat_id,
          date: Time.new(month_year.year_date, m.month_num, date),
        )
      end
      years =Year.where(account_id: 1)
      years.where("year_date > ?", month_year.year_date).each do |y|
        allMonths = Month.where(year_id: y.id).each do |m|
          m.update(expense: expense + m.expense, planned: planned + m.planned)
          Category.create(
            name: name, 
            planned: planned, 
            expense: expense, 
            is_fixed: is_fixed, 
            month_id: m.id,
            repeat_id: repeat_id,
            date: Time.new(y.year_date, m.month_num, date),
          )
        end
      end
    end
    payload
  end
end