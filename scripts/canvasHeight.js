// funcion que devuelve el alto del canvas relativo al navegador para que sea responsive


let canvasHeight = (porc) => {
	canvasHeight = ((window.innerHeight * porc) / 100)
	return canvasHeight
}
export default canvasHeight