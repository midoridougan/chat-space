class Group < ApplicationRecord
  has_many :messages
  has_many :group_users
  has_many :users, through: :groups_users
  validatates :name, presense: true, uniquness: true
end