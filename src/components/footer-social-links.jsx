import { InstagramLogo, LinkedinLogo } from '@phosphor-icons/react'

const socialLinks = [
  { label: 'SideTwo auf LinkedIn', href: 'https://www.linkedin.com/in/alexandros-kodalis-42a908334/', Icon: LinkedinLogo },
  { label: 'SideTwo auf Instagram', href: 'https://www.instagram.com/sidetwo.de/', Icon: InstagramLogo },
]

export function FooterSocialLinks() {
  return <div className="footer-socials" aria-label="SideTwo Social Media">
    {socialLinks.map(({ label, href, Icon }) => <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}><Icon size={19} weight="bold" aria-hidden="true" /><span className="sr-only">{label}</span></a>)}
  </div>
}
