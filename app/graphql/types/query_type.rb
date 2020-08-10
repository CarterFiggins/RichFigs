module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :users, [Type::UserType], null: false do
      description "gets all Users"
    end

    
    def users
      User.all
    end

    field :year, Type::YearType, null: false do
      description "get year"
      argument :year_date, Int, required: false
    end

    def year(year_date)
      puts "************************** Inside get YEAR ***********************************"
      Year.find(year_date: year_date)
    end

  end
end
