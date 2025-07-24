import { memo } from "react"
import "./index.css"

const Loader = (props) => {

    const { loading } = props

    if (loading) {
        return (
            <div className="loader-overlay">
                <div className="loader-container">
                    <div className="box"></div>
                    <div className="frequency-loader">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="bar"
                                style={{
                                    animationDuration: `${Math.random() * 1.5 + 0.5}s`,
                                    animationDelay: `${Math.random() * 0.5}s`
                                }}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return null
}

export default memo(Loader)