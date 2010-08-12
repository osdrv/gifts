# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  helper :all # include all helpers, all the time
  before_filter :set_locale 

  protect_from_forgery # See ActionController::RequestForgeryProtection for details
  def available_locales; AVAILABLE_LOCALES; end 
  # Scrub sensitive parameters from your log
  # filter_parameter_logging :password
  def set_locale
    #logger.debug "* Accept-Language: #{request.env['HTTP_ACCEPT_LANGUAGE']}"
    if user_defined_locale = extract_locale_from_accept_language_header
      I18n.locale = user_defined_locale
    end
    #logger.debug "* Locale set to '#{I18n.locale}'"
  end
  
  private
  def extract_locale_from_accept_language_header 
    return request.env['HTTP_ACCEPT_LANGUAGE'].scan(/^[a-z]{2}/).first if request.env['HTTP_ACCEPT_LANGUAGE']
  end 
end
