class Player < ApplicationRecord
  validates :first_name, :last_name, :email, presence: true

  def to_s
    [first_name, last_name].reject(&:blank?).join(' ')
  end
end
