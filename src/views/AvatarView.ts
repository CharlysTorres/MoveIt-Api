import Avatar from '../models/Avatar';

export default {
  render(avatar: Avatar) {
    return {
      id: avatar.id,
      url: `${avatar.url}`,
    };
  },

  renderMany(avatars: Avatar[]) {
    return avatars.map(avatar => this.render(avatar));
  }
}
