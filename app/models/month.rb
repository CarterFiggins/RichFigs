class Month < ApplicationRecord
    belongs_to :year
    has_many :categories
    has_many :payss
end
