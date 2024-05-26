import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import s from "./Label.module.scss"
import { Text } from '../Text/Text'

type Props = {
  label: string | undefined
} & ComponentPropsWithoutRef<typeof Text>

export const Label = (props: Props) => {
  const { className, label } = props
  const classLabel = clsx(s.label, className)

  return <Text as={'label'} className={classLabel} htmlFor={label}>
        {label}
      </Text>
}
