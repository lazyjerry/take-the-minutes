import formHTML from './form.html'
import pdfHTML from './pdf.html'

addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
	const url = new URL(request.url)

	if (url.pathname === "/favicon.ico") {
		return new Response("🔥", { // 這裡回應的是火焰符號
			headers: { "Content-Type": "text/plain" }
		});
	}

	if (url.pathname === '/' || url.pathname === '/form') {
		return new Response(formHTML, {
			headers: { 'Content-Type': 'text/html;charset=UTF-8' }
		})
	} else if (request.method === 'POST') {
		// 取得表單資料
		const formData = await request.formData()
		const data = formData.get('data') || '{}'

		// 將 pdf.html 內的 __FORM_DATA__ 佔位字串替換為實際 JSON
		const replaced = pdfHTML.replace('__FORM_DATA__', data)

		return new Response(replaced, {
			headers: { 'Content-Type': 'text/html; charset=UTF-8' }
		})
	} else {
		return new Response('Not Found', { status: 404 })
	}
}
