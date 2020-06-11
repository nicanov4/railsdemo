class RemoveIsPrivateFromComments < ActiveRecord::Migration[6.0]
  def change
    remove_column :comments, :isPrivate, :boolean
  end
end
