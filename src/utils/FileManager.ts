var filesLoadedToPage: string[] = [];
export class FileService {
	public static loadScript(uri: string): Promise<void> {
		return new Promise((resolve, reject) => {
			if (filesLoadedToPage.indexOf(uri) > -1) resolve();
			const tag = document.createElement("script");
			tag.src = uri;
			tag.async = true;
			tag.onload = () => {
				resolve();
			};
			tag.onerror = () => {
				reject();
			}
			const firstScriptTag = document.getElementsByTagName("script")[0];
			if (firstScriptTag.parentNode !== null) {
				filesLoadedToPage.push(uri);
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			}
			else {
				reject()
			}
		});
	}
}