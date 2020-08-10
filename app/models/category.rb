class Category < ApplicationRecord
    has_many :months
    has_many :spents
end
