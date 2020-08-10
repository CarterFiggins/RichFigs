module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.


    field :users, [Types::UserType], null: false do
      description "get all users"
    end
    def users
      User.all
    end

    field :year, Types::YearType, null: false do
      description "get year by year_date"
      argument :year_date, Int, required: false
    end
    def year(year_date: Time.now.year)
      Year.find_by(year_date: year_date)
    end

  end
end
