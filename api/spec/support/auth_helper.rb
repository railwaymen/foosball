# frozen_string_literal: true

module AuthHelper
  def http_login
    api_key = create :api_key
    token = JWT.encode({ client_id: api_key.client_secret }, api_key.client_secret, 'HS256')
    request.env['HTTP_AUTHORIZATION'] = "Token token=#{token}, client_id=#{api_key.client_id}"
  end

  def exired_http_login
    api_key = create :api_key
    token = JWT.encode({ client_id: api_key.client_secret, exp: Time.now.to_i }, api_key.client_secret, 'HS256')
    request.env['HTTP_AUTHORIZATION'] = "Token token=#{token}, client_id=#{api_key.client_id}"
  end
end
