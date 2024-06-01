import { RefObject, useEffect, useRef } from 'react';

export function useOutsideClickClose(onOutsideClick: () => void) {
	const ref = useRef() as RefObject<HTMLFormElement>;

	useEffect(() => {
		function handleClick(event: MouseEvent) {
			const { target } = event;
			if (
				target instanceof Node &&
				ref.current &&
				!ref.current.contains(target)
			) {
				onOutsideClick();
			}
		}

		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [onOutsideClick]);

	return ref;
}
