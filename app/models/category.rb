class Category < ApplicationRecord
    has_many :month
    has_many :spent 
end
