import User from '../models/User';
import AvatarView from './AvatarView';
import LevelView from './LevelView';

export default {
  render(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: AvatarView.renderMany(user.avatar),
      level: LevelView.render(user.level),
    };
  },

  renderMany(users: User[]) {
    return users.map(user => this.render(user));
  }
}