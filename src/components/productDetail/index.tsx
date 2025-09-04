import { ResponseModality } from "firebase/ai"

export default function ProductDetailComponent() {

    const fetchProductById = async() => {
        try {
            const response = await fetch('https://dummyjson.com/products/1')
            const data = await response.json()
            console.log(data)
            
        } catch (error: any) {
            console.log("Error: ", error)
        }
    }

    fetchProductById()
  return (
    <div>ProductDetail</div>
  )
}
