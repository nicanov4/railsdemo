class Comment < ApplicationRecord
  scope :isPublic,               -> { where(isPrivate: false) }
  scope :isPrivate,              -> { where(isPrivate: true) }
  #scope :private_and_curUser,    -> { isPrivate.where(commenter: current_user.email) }
  belongs_to :article
end
