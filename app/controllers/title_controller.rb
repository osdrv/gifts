class TitleController < ApplicationController
  
  include AuthenticatedSystem
  
  def index
    @recent_wishes = Gift.get_recent_wishes
    @current_user_id = self.current_user ? self.current_user.id : nil
    @current_user = self.current_user
    @page_title = "GitMe.It"
  end
end
