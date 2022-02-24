import { Iframe } from "./Music/Iframe";

export const MusicHub = () => {
    return (
        <div>
            <Iframe/>
            {/* <div>each comp will wrap an iframe + h1
                consider rendering as gallery to have only one iFrame onScreen
            </div> */}
            <p>(Additional 4 links here)</p>
        </div>
    )
}