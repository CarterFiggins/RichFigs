class Mutations::CreateCategory < Mutations::BaseMutation
  null true
  description "Make Category"
  field :category, Types::CategoriesType, null: false
  argument :name, String, required: true
  argument :amount, Float, required: true
  argument :is_fixed, Boolean, required: false
  argument :month_id, ID, required: true
  argument :repeated, Boolean, required: false
  argument :is_edit, Boolean, required: false
  argument :category_id, ID, required: false
  argument :date, Int, required: false

  def resolve(name:, amount:, is_fixed:, month_id:, repeated:, is_edit:, category_id:, date:)
    # TODO: Repeat Date

    planned = 0
    expense = 0
    repeat_id = nil
    month = Month.find(month_id)

    if (is_edit)
      oldCategory = Category.find(category_id)
      planned = oldCategory.planned
      expense = oldCategory.expense
      if (is_fixed && oldCategory.is_fixed)
        month.update(expense: amount + month.expense - oldCategory.expense, planned: amount + month.planned - oldCategory.planned)
        expense = amount
      elsif (!is_fixed && oldCategory.is_fixed)
        month.update(expense: month.expense - oldCategory.expense, planned: amount + month.planned - oldCategory.planned)
        planned = amount
        expense = 0
      elsif (is_fixed && !oldCategory.is_fixed)
        month.update(expense: amount + month.expense - oldCategory.expense, planned: amount + month.planned - oldCategory.planned)
        expense = amount
        planned = amount
      else 
        month.update(planned: amount + month.planned - oldCategory.planned)
        planned = amount
      end
      oldCategory.update(name: name, planned: planned, expense: expense, is_fixed: is_fixed, month_id: month_id, date: date )
      { category: oldCategory}
    else

      if is_fixed
        month.update(expense: amount + month.expense, planned: amount + month.planned)
        expense = amount;
        planned = amount;
      else
        month.update(planned: amount + month.planned)
        planned = amount;
      end

      if repeated
        current_year = Year.find(month.year_id)
        repeat = Repeat.create(account_id: current_year.account_id, name: name, amount: amount, date: date, transaction_type: is_fixed ? "expense" : "planned")
        repeat_id = repeat.id

        months = Month.where(year_id: current_year.id)
        months.where("month_num > ?", month.month_num).each do |m|
          m.update(expense: expense, planned: planned)
          Category.create(
            name: name, 
            planned: planned, 
            expense: expense, 
            is_fixed: is_fixed, 
            month_id: m.id,
            repeat_id: repeat_id,
          )
        end
        years =Year.where(account_id: 1)
        years.where("year_date > ?", current_year.year_date).each do |y|
          allMonths = Month.where(year_id: y.id).each do |m|
            m.update(expense: expense, planned: planned)
            Category.create(
              name: name, 
              planned: planned, 
              expense: expense, 
              is_fixed: is_fixed, 
              month_id: m.id,
              repeat_id: repeat_id,
            )
          end
        end
      end
      
      category = Category.create(
        name: name,
        planned: planned,
        expense: expense,
        is_fixed: is_fixed,
        month_id: month_id,
        date: date,
        repeat_id: repeat_id
      )

      { category: category }
    end
  end
end