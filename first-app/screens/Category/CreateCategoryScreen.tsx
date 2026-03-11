import FormLayout from "@/components/layouts/FormLayout";
import {useForm, Controller} from 'react-hook-form';
import {CreateCategoryFormData, createCategorySchema} from "@/schemas/categorySchema";
import {zodResolver} from '@hookform/resolvers/zod';
import CustomInput from "@/components/form/inputs/CustomInput";

const CreateCategoryScreen = () => {

    const {control, handleSubmit, formState: {errors}} = useForm<CreateCategoryFormData>({
        resolver: zodResolver(createCategorySchema),
        defaultValues: {name: '', description: ''}
    });

    const onSubmit = async (data: CreateCategoryFormData) => {
        console.log("Submitting data: ", data);
    }

    return (
        <>
            <FormLayout title="Welcome">
                <Controller
                    control={control}
                    name="name"
                    render={({field: {onChange, onBlur, value}}) => (
                        <CustomInput
                            label="Назва"
                            placeholder="Назва категорії"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={errors.name?.message}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    )}
                />
            </FormLayout>
        </>
    )
}

export default CreateCategoryScreen;