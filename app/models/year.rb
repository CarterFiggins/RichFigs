class Year < ApplicationRecord
  has_many :months
  belongs_to :account
end
