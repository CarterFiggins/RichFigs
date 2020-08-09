class Mutations::CreateCategoryMutation < Mutations::BaseMutation
  null true
  description: "Creates A Category"
  argument: month_id
  argument: repeat_id
  argument: name
  argument: planned
  argument: expense
  argument: date

  def resolve(month_id, repeat_id, name, planned, expence, date )
    Category.create(name:name, planned: planned, expence: expence, month_id: month_id, repeat_id: repeat_id, date: date)
  end
end