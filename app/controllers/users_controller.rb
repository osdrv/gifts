class UsersController < ApplicationController
  # Be sure to include AuthenticationSystem in Application Controller instead
  include AuthenticatedSystem
  
  def new
    @user = User.new
  end
 
  def create
    
    logout_keeping_session!
    @user = User.new(params[:user])
    success = @user && @user.save
    if success && @user.errors.empty?
            # Protects against session fixation attacks, causes request forgery
      # protection if visitor resubmits an earlier form using back
      # button. Uncomment if you understand the tradeoffs.
      # reset session
      self.current_user = @user # !! now logged in
      redirect_back_or_default('/')
      flash[:notice] = "Thanks for signing up!  We're sending you an email with your activation code."
    else
      flash[:error]  = "We couldn't set up that account, sorry.  Please try again, or contact an admin (link is above)."
      render :action => 'new'
    end
    
  end
  
  def search
    @page_title = "Search for users"
    @users = User.search_like(params[:q])
    render :layout => false
  end
  
  def show
    if params[:id]
      @user = User.find(params[:id])
    elsif params[:login]
      @user = User.find_by_name(params[:login])
    end
    @is_me = @user.is_me?(self.current_user)
    if (@is_me)
      @gifts = @user.gifts
      @friendship_requests = @user.friendship_requests
    else
      @is_friend = @user.is_friend?(self.current_user)
      @gifts = @user.public_gifts(self.current_user)
    end
    @page_title = @user.login + "'s wishlist"
    @new_gift = Gift.new
  end
  
  def add_wish
    user = self.current_user
    @gift = Gift.new(params[:gift])
    @gift.name = Sanitize.clean(@gift.name, Sanitize::Config::BASIC)
    @gift.user_id = self.current_user.id
    success = @gift && @gift.save
    
    render :layout => false
    
    if !success
      render :nothing => true
    end
  end
end
