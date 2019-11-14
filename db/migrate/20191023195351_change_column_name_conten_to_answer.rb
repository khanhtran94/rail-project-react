class ChangeColumnNameContenToAnswer < ActiveRecord::Migration[5.2]
  def change
    rename_column :answers, :conten, :content
  end
end
