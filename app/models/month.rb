class Month < ApplicationRecord
    belongs_to :year
    has_many :category
    has_many :pay
end
