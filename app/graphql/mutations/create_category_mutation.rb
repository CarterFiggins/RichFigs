class Mutations::CreateCategoryMutation < Mutations::BaseMutation
  null true
  description: "Creates A Category"
  argument: name
  argument: planned
  argument: expense
  argument: month_id

  def resolve(name, planned, expence, month_id)
    Category.create(name:name, planned: planned, expence: expence, month_id: month_id)
  end
end