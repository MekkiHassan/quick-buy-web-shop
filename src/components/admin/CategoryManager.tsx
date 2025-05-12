
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Plus, Trash } from "lucide-react";
import { toast } from "sonner";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface CategoryManagerProps {
  categories: string[];
  onCategoryChange: (updatedCategories: string[]) => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({ categories, onCategoryChange }) => {
  const [newCategory, setNewCategory] = useState<string>("");
  const [editingCategory, setEditingCategory] = useState<{index: number, value: string} | null>(null);

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }
    
    if (categories.includes(newCategory)) {
      toast.error("Category already exists");
      return;
    }
    
    onCategoryChange([...categories, newCategory]);
    setNewCategory("");
    toast.success("Category added successfully!");
  };

  const handleDeleteCategory = (categoryToDelete: string) => {
    if (categoryToDelete === "All") {
      toast.error("Cannot delete the 'All' category");
      return;
    }
    
    onCategoryChange(categories.filter(category => category !== categoryToDelete));
    toast.success("Category deleted successfully!");
  };

  const handleEditCategoryStart = (index: number, value: string) => {
    setEditingCategory({ index, value });
  };

  const handleEditCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingCategory) {
      setEditingCategory({ ...editingCategory, value: e.target.value });
    }
  };

  const handleEditCategorySave = () => {
    if (!editingCategory) return;
    
    if (!editingCategory.value.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }
    
    if (categories.includes(editingCategory.value) && categories[editingCategory.index] !== editingCategory.value) {
      toast.error("Category already exists");
      return;
    }
    
    const newCategories = [...categories];
    newCategories[editingCategory.index] = editingCategory.value;
    onCategoryChange(newCategories);
    setEditingCategory(null);
    toast.success("Category updated successfully!");
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Manage Categories</h2>
        
        <div className="flex items-end gap-4 mb-6">
          <div className="flex-1">
            <Label htmlFor="new-category">New Category</Label>
            <Input
              id="new-category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name"
            />
          </div>
          <Button 
            onClick={handleAddCategory}
            className="bg-shop-blue hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Category
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category, index) => (
                <TableRow key={category}>
                  <TableCell>
                    {editingCategory && editingCategory.index === index ? (
                      <Input
                        value={editingCategory.value}
                        onChange={handleEditCategoryChange}
                        autoFocus
                        onBlur={handleEditCategorySave}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleEditCategorySave();
                          if (e.key === 'Escape') setEditingCategory(null);
                        }}
                      />
                    ) : (
                      category
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      {category !== "All" && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditCategoryStart(index, category)}
                            disabled={editingCategory !== null}
                          >
                            <Pencil className="h-4 w-4 mr-1" /> Edit
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteCategory(category)}
                            disabled={editingCategory !== null}
                          >
                            <Trash className="h-4 w-4 mr-1" /> Delete
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
