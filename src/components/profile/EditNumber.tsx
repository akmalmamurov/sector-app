import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Pencil } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useRequireAuth } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { getUser, updateUserPhone } from '@/api';
import InputMask from 'react-input-mask-next';

const EditNumber = () => {
  useRequireAuth();
  
  const { data: user, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  // Modal state
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState<string>(user?.phone || "");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (open) {
      setPhone(user?.phone || "");
      const cleaned = (user?.phone || "").replace(/[^0-9]/g, "");
      setIsValid(cleaned.length === 12);
    }
  }, [open, user]);

  const handleInputChange = (val: string) => {
    setPhone(val);
    const cleaned = val.replace(/[^0-9]/g, "");
    setIsValid(cleaned.length === 12);
  };

  const handleSave = async () => {
    if (!isValid) return;

    try {
      await updateUserPhone(phone); // Call API to update phone
      refetch(); // Refetch the updated user data
      setOpen(false); // Close the modal
      console.log("Phone number saved:", phone);
    } catch (error) {
      console.error("Error saving phone number:", error);
    }
  };

  const divRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (divRef.current) {
    // You can now access the DOM node directly
    console.log(divRef.current);
  }
}, []);



  return (
    <div className="border-b border-superSilver py-5">
      <div className="p-6">
        <h2 className="text-xl mb-4">Контакты</h2>
        <div className="flex items-center justify-between mb-6">
          <span className="text-base">{phone}</span>
          <button
            onClick={() => setOpen(true)}
            className="border border-cerulean rounded-xl flex items-center gap-2 h-[42px] px-4"
          >
            <Pencil className="text-cerulean w-[20px] h-[20px]" />
            <span className="text-cerulean text-base font-semibold">Изменить</span>
          </button>
        </div>

        {/* Modal */}
        <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
          <DialogContent className="w-[90vw] max-w-md rounded-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-medium">Изменить номер</DialogTitle>
            </DialogHeader>

            <div className="mt-4">
              <label className="block text-sm mb-2 text-gray-700">Телефон</label>
              <InputMask
                mask="+998 (99) 999-99-99"
                value={phone}
                onChange={(e) => handleInputChange(e.target.value)}
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+998 (__) ___-__-__"
              />
            </div>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Отмена
              </Button>
              <Button onClick={handleSave} disabled={!isValid}>
                Сохранить
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EditNumber;
