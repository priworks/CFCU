import { useEffect, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { externalOnClick } from '@/utils'
interface Props {
  title: string
  externalLink?: {
    link: string
    openInNewTab: boolean
    showPdfPageLeaveAlert?: boolean
  }
  link?: {
    _type: string
    link: string
  }
  externalLinkOneOff?: {
    link: string
    openInNewTab: boolean
    showPdfPageLeaveAlert?: boolean
  }
}

const WysiwygPageLink = ({
  title,
  externalLink,
  link,
  externalLinkOneOff,
}: Props) => {
  const [href, setHref] = useState('')
  const [target, setTarget] = useState('_self')
  const [showAlert, setShowAlert] = useState(true)

  useEffect(() => {
    if (link?._type) {
      switch (link?._type) {
        case 'post':
          setHref(`/${link?.link}`)
          break
        case 'homepage':
          setHref('/')
          break
        case 'subPage':
          setHref(`/${link?.link}`)
          break
        case 'blogHomePage':
          setHref(`/posts/page/1`)
          break
        case 'locationHomePage':
          setHref(`/locations`)
          break
        case 'topic':
          setHref(`/${link?.link}/1`)
          break
        case 'location':
          setHref(`/${link?.link}`)
          break
        default:
          setHref('/')
          break
      }
    }
    if (externalLinkOneOff?.link) {
      setHref(externalLinkOneOff?.link)
      if (externalLinkOneOff?.openInNewTab) {
        setTarget('_blank')
      }
      setShowAlert(externalLinkOneOff?.showPdfPageLeaveAlert)
    }
    if (externalLink?.link) {
      setHref(externalLink.link)
      if (externalLink?.openInNewTab) {
        setTarget('_blank')
      }
      setShowAlert(externalLink?.showPdfPageLeaveAlert)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return link?._type ? (
    <Link
      href={href}
      className={clsx(
        'underline font-codec-bold text-lavender hover:no-underline transition-colors duration-200',
      )}
    >
      {title}
    </Link>
  ) : (
    <a
      href={href}
      target={target}
      onClick={(e) => externalOnClick(e, href, showAlert)}
      className={clsx(
        'underline font-codec-bold text-lavender hover:no-underline transition-colors duration-200',
      )}
    >
      {title}
    </a>
  )
}

export default WysiwygPageLink
