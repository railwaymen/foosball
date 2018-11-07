class ApiKey < ApplicationRecord
  before_create :generate_client_id
  before_create :generate_client_secret

  private

  def generate_client_id
    loop do
      self.client_id = SecureRandom.hex
      break unless self.class.exists?(client_id: client_id)
    end
  end

  def generate_client_secret
    loop do
      self.client_secret = SecureRandom.hex
      break unless self.class.exists?(client_secret: client_secret)
    end
  end
end
