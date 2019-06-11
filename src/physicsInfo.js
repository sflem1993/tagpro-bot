export default class PhysicsInfo {
	constructor(info) {
		this.x = info.x;
		this.y = info.y;
		this.accelX = 0;
		this.accelY = 0;
		this.velocityX = 0;
		this.velocityY = 0;
	}
	//if key pressed - accel  = 1.5, else 0 (special cases - bomb, boost, jj, team tiles)
}