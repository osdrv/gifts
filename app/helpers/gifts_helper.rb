module GiftsHelper
  def get_state_class(gift)
    if gift.promised?
      return "promised"
    elsif gift.done?
      return "done"
    else
      return ""
    end
  end
end
