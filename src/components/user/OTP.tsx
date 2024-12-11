import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

interface Props {
    onChange: (value: string) => void;
    disabled: boolean;
}

const OTPForm: React.FC<Props> = ({ onChange, disabled }) => {
    return <InputOTP maxLength={6} onChange={onChange} disabled={disabled}  >
        <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
        </InputOTPGroup>
    </InputOTP>

};

export default OTPForm;