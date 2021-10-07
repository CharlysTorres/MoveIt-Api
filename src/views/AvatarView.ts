import Avatar from '../models/Avatar';

export default {
  render(avatar: Avatar) {
    return {
      id: avatar.id,
      url: `http://localhost:3333/uploads/${avatar.url}`,
    };
  },

  renderMany(avatars: Avatar[]) {
    return avatars.map(avatar => this.render(avatar));
  }
}