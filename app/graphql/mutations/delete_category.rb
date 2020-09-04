class Mutations::DeleteCategory < Mutations::BaseMutation
  null true
  description "Delete a Category"
  field :deleted, Boolean, null: false 
  argument :month_id, ID, required: true
  argument :category_id, ID, required: true
  argument :repeat_id, ID, required: false

  def resolve(month_id:, category_id:, repeat_id:)
    category = Category.find(category_id)
    month = Month.find(month_id)
    year = Year.find(month.year_id)
    month.update(expense: month.expense - category.expense, planned: month.planned - category.planned)
    Spent.where(category_id: category_id).delete_all
    category.delete
    if(repeat_id)
      categories = Category.where(repeat_id: repeat_id).where("date > ?", category.date)
      categories.each do |c|
        m = Month.find(c.month_id)
        m.update(expense: m.expense - c.expense, planned: m.planned - c.planned)
        Spent.where(category_id: c.id).delete_all
        c.delete
      end
      Repeat.update(alive: false)
      if Category.where(repeat_id: repeat_id).length == 0
        Repeat.find(repeat_id).delete
      end
    end
    {deleted: true}
  end

end