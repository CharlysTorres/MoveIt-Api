import Level from "../models/Level";
import User from "../models/User";

export default {
  render(level: Level) {
    return {
      id: level.id,
      level: level.level,
      currentExperience: level.currentExperience,
      challegesCompleted: level.challengesCompleted
    }
  },
  renderMany(levels: Level[]) {
    return levels.map(level => this.render(level));
  },

  renderLeaderboard(level: Level[]) {
    return {
      level: level.map(level => this.render(level))
    }
  }
}