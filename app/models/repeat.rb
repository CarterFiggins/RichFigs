class Repeat < ApplicationRecord
  has_many :categories
  has_many :pays
  has_many :spents
end
