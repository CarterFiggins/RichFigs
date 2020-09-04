# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Year.delete_all
Month.delete_all
Category.delete_all
Income.delete_all
Spent.delete_all
Repeat.delete_all

year = Year.create(year_date: Time.now.year)
month = Month.create(year_id: year.id, month_num: Time.now.month, date: Date::MONTHNAMES[Date.today.month], income: 0, planned: 0, expense: 0)
