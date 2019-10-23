class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  varidates :body, presence: true, unless: :image?
end
