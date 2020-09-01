module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :user, Types::UserType, null: false do
      description "get user by id"
      argument :user_id, ID, required: true
    end
    def users(user_id:)
      User.find(user_id)
    end

    field :year, Types::YearType, null: false do
      description "get year by year_date"
      argument :year_date, Int, required: false
      argument :account_id, ID, required: true
    end
    def year(year_date: Time.now.year, account_id:)
      year = Year.find_by(account_id: account_id, year_date: year_date)
      if !year 
        year = Year.create(account_id: account_id, year_date: year_date)
      end
      year
    end

    field :month, Types::MonthType, null: false do
      description "get month by year and month"
      argument :year_date, Int, required: false
      argument :date, String, required: false
      argument :account_id, ID, required: true
      argument :month_num, Int, required: false
      argument :user_id, ID, required: true
    end
    def month(year_date: Time.now.year, date:, account_id:, month_num: Time.now.month, user_id:)
      year = Year.find_by(account_id: account_id, year_date: year_date)
      month = Month.find_by(year_id: year.id, date: date)
      if !month
        month = Month.create(date: date, month_num: month_num, year_id: year.id, income: 0, planned: 0, expense: 0)
        Repeat.where(account_id: account_id).each do |repeat|
          if repeat.year_date < year.year_date || repeat.month_date <= month_num && repeat.year_date == year.year_date
            if repeat.transaction_type == "expense"
              Category.create(
                name: repeat.name,
                expense: repeat.amount,
                planned: repeat.amount,
                is_fixed: true,
                month_id: month.id,
                repeat_id: repeat.id,
              )
              month.update(expense: month.expense + repeat.amount, planned: month.planned + repeat.amount)
            elsif repeat.transaction_type == "planned"
              Category.create(
                name: repeat.name,
                expense: 0,
                planned: repeat.amount,
                is_fixed: true,
                month_id: month.id,
                repeat_id: repeat.id,
              )
              month.update(planned: month.planned + repeat.amount)
            elsif repeat.transaction_type == "income"
              Income.create(
                name: repeat.name,
                amount: repeat.amount,
                user_id: user_id,
                month_id: month.id,
                date: Time.new(year.year_date, repeat.month_date, repeat.day_date),
                repeat_id: repeat.id,
              )
              month.update(income: month.income + repeat.amount)
            end
          end
        end

      end
      month
    end

    field :spents, [Types::SpentType], null: false do
      description "get spents from category"
      argument :category_id, ID, required: true
    end
    def spents(category_id)
      Spent.where(category_id: category_id[:category_id])
    end

    field :pay, [Types::PayType], null: false do
      description "get all pay from month"
      argument :month_id, ID, required: true
    end
    def pay
      Pay.where(month_id: month_id)
    end

    field :categories, [Types::CategoriesType], null: false do
      description "get category from month"
      argument :month_id, ID, required: true
    end
    def categories(month_id)
      Category.where(month_id: month_id[:month_id])
    end

    field :incomes, [Types::IncomeType], null: false do
      description "get income from month"
      argument :month_id, ID, required: true
    end
    def incomes(month_id)
      Income.where(month_id: month_id[:month_id])
    end
  end
end
