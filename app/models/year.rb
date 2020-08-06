class Year < ApplicationRecord
  has_many :month
  belongs_to :account
end
