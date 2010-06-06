class FriendsController < ApplicationController
  include AuthenticatedSystem
  
  def create
    user = User.find(params[:user_id])
    if !user
      render :status => 500, :text => "User not found"
    end
    if !self.current_user
      render :status => 500, :text => "Authorization required"
    end
    user.request_friendship(self.current_user)
    render :nothing => true
  end
  
  def update
    if !self.current_user
      render :status => 500, :text => "Authorization required"
    end
    user_id = params[:user_id]
    friendship = Friend.users_friendship(self.current_user.id, user_id)
    if friendship
      friendship.status = 1
      friendship.save
    end
    render :nothing => true
  end
  
  def destroy
    if !self.current_user
      render :status => 500, :text => "Authorization required"
    end
    user_id = params[:user_id]
    friendship = Friend.users_friendship(self.current_user.id, user_id)
    if friendship
      friendship.status = -1
      friendship.save
    end
  end
end
