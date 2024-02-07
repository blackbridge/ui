
export function lerp(x:number, y:number, a:number): number {
	return x * (1 - a) + y * a
}


export function clamp(min: number, max: number, x: number) {
	return Math.min(max, Math.max(min, x))
}


export function inverseLerp(x: number, y:number, a:number) {
	return (a - x) / (y - x) || 0
}