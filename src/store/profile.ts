import create, { StateCreator } from 'zustand';

interface IProfileStates {
    image: string | null;
    name: string;
    email: string;
    pass: string;
    isSignedIn: boolean;
}

interface IProfileMethods {
    setProfile: (profile: Partial<IProfileStates>) => void;
    setName: (name: string) => void;
    setEmail: (email: string) => void;
    setPass: (pass: string) => void;
    setIsSignedIn: (isSignedIn: boolean) => void;
    reset: () => void;
}

interface IProfileStore extends IProfileStates, IProfileMethods { }

const store: StateCreator<IProfileStore> = set => ({
    image: 'https://2k21.s3.ap-south-1.amazonaws.com/Ellipse+8.png',
    name: '',
    email: '',
    pass: '',
    isSignedIn: true,
    setProfile: (profile: Partial<IProfileStates>) => set(profile),
    setName: (name: string) => set({ name }),
    setEmail: (email: string) => set({ email }),
    setPass: (pass: string) => set({ pass }),
    reset: () => set({
        image: null,
        name: '',
        email: '',
        pass: '',
    }),
    setIsSignedIn: (isSignedIn: boolean) => set({ isSignedIn }),
})

export const useProfileStore = create<IProfileStore>(store);