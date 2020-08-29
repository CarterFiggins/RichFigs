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

  def resolve(name:, amount:, is_fixed:, month_id:, repeated:, is_edit:, category_id:)
    # TODO: Repeat Date

    planned = 0
    expense = 0
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
      oldCategory.update(name: name, planned: planned, expense: expense, is_fixed: is_fixed, month_id: month_id, date: Time.now )
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
      category = Category.create(name: name, planned: planned, expense: expense, is_fixed: is_fixed, month_id: month_id, date: Time.now)
      { category: category }
    end
  end
end