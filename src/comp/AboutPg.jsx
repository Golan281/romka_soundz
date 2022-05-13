import romka_main_websize from '../img/romka_main_websize.jpg';
import { IframeTube } from './Music/IframeTube';
import { useNavigate } from 'react-router-dom';

export const AboutPg = () => {
    const nav = useNavigate();
    const aboutTxt = 'ממסיבות במקלטים בסוף שנות ה-90, דרך הבארים, המועדונים והגגות של דרום תל אביב ועד לרחבות אקסטטיות במרכז אמריקה - הדרך שלי, רומן אוסטרובסקי (או ROMKA) בעולם התקלוט מתפתלת ונפתחת כבר מעל 20 שנה. בין אם זו חתונה ישראלית או מסיבת טבע מחתרתית, אני מצליח להביא את האוזן המקורית, הלב הפתוח והחיוך שיודע להרכיב את הפאזל המוזיקלי הנכון לכל אירוע. עם מגוון השפעות מכל העולם, אני אוהב לנוע בחופשיות בין ז\'אנרים וסגנונות, שואל קצת מכולם מבלי להתחייב, מדלג בין ביטים אלקטרוניים גלובאליים לקטעים Fאנקיים מזיזי ישבנים. ממקסס חדש וישן, מיינסטרים ואלטרנטיבי והכל בקלילות וברגישות לרחבה, לאנשים ולאנרגיה המתחלפת.';


    return (
        <div className='about-pg'>
            <img className="img" src={romka_main_websize} alt="romka profile"></img>
            <h1 className='h1-eng'>About Me</h1>
            <p className='rtl'>
                {aboutTxt}
            </p>
            <IframeTube/>
            {/* <NavLink to="/subscribe" key="subscribe"> */}
                <button className="btn form-btn" onClick={()=>nav('/subscribe')}>Subscribe</button>
                {/* </NavLink>  */}
        </div>
    )
}