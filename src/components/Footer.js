import classes from "../styles/Daily.module.css";
export default function Footer() {
	return <div className={classes.footer}
	style={{
		display:`${window.screen.width>500?'flex':'grid'}`,
	}}>
<p>{window.screen.width > 500 ? "All right reserved":null} &copy; soab mahmud</p>
<p> for project contact Whatsapp @<a href="https://wa.me/1644556543">01644556543</a></p>
	</div>;
}