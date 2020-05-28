class Comment < ApplicationRecord
  scope :isPublic,               -> { where(isPrivate: false) }
  scope :isPrivate,              -> { where(isPrivate: true) }

  belongs_to :article
  belongs_to :user
end
