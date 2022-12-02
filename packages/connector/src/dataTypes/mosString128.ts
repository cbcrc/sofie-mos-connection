import { IMOSString128 } from '@mos-connection/model'

export class MosString128 implements IMOSString128 {
	private _str = 'undefined'

	/** */
	constructor(str: AnyString, private strict: boolean = true) {
		this.string = str
	}
	/** */
	toString(): string {
		return this._str
	}

	/** */
	set string(str: AnyString) {
		if (typeof str === 'object' && str) {
			if (str.text) {
				this._str = str.text.toString()
			} else if (str._str) {
				// is a MosString128
				this._str = str._str.toString()
			} else if (Object.keys(str).length === 0) {
				// is empty?
				this._str = ''
			} else {
				this._str = JSON.stringify(str)
			}
		} else {
			this._str = str !== `undefined` ? String(str) : ''
		}
		this._validate()
	}

	/** */
	private _validate() {
		if (this.strict) {
			if ((this._str || '').length > 128) throw new Error('MosString128 length is too long (' + this._str + ')!')
		}
	}
}

type AnyString = string | { text: string; type: string } | MosString128 | any
